use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use dotenvy::dotenv;
use std::env;
use tera::{Tera, Context};

mod schema;
mod models;

use models::{Post, NewPost};

type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

async fn index(tera: web::Data<Tera>, pool: web::Data<DbPool>) -> impl Responder {
    use crate::schema::posts::dsl::*;

    let mut conn = pool.get().expect("Couldn't get db connection from pool");

    // The web::block returns a Result<T, E> where T is the result of the synchronous block,
    // and E is an actix_web::Error (e.g., if the blocking thread pool is full).
    // The synchronous block itself returns Result<Vec<Post>, diesel::result::Error>.
    let block_result = web::block(move || {
        posts.limit(5).load::<Post>(&mut conn)
    }).await;

    // Handle the outer Result from web::block (e.g., thread pool errors)
    let query_result: Result<Vec<Post>, diesel::result::Error> = match block_result {
        Ok(inner_result) => inner_result, // `inner_result` is `Result<Vec<Post>, diesel::result::Error>`
        Err(e) => {
            eprintln!("Error in web::block for fetching posts: {:?}", e);
            return HttpResponse::InternalServerError().body(format!("Database operation failed (internal error): {:?}", e));
        }
    };

    // Handle the inner Result from the Diesel query (database errors, e.g., table not found)
    let results: Vec<Post> = match query_result {
        Ok(posts_vec) => posts_vec, // `posts_vec` is `Vec<Post>`
        Err(e) => {
            eprintln!("Error fetching posts from database: {:?}", e);
            return HttpResponse::InternalServerError().body(format!("Error fetching posts from database: {:?}", e));
        }
    };

    // At this point, 'results' is definitely `Vec<Post>`, which can be serialized
    // by Tera assuming `Post` has `#[derive(Serialize)]`.
    let mut context = Context::new();
    context.insert("posts", &results);

    match tera.render("index.html", &context) {
        Ok(html) => HttpResponse::Ok().body(html),
        Err(e) => {
            eprintln!("Template rendering error: {:?}", e);
            HttpResponse::InternalServerError().body(format!("Template error: {:?}", e))
        }
    }
}

async fn add_post(pool: web::Data<DbPool>) -> impl Responder {
    use crate::schema::posts;

    let mut conn = pool.get().expect("Couldn't get db connection from pool");

    let new_post = NewPost {
        title: "My First Post".to_string(),
        body: "This is the content of my first post.".to_string(),
    };

    let _ = web::block(move || diesel::insert_into(posts::table).values(&new_post).execute(&mut conn))
        .await
        .map_err(|e| HttpResponse::InternalServerError().body(format!("Error inserting post: {:?}", e)))
        .unwrap(); // Simplified error handling for brevity

    HttpResponse::Ok().body("Post added!")
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // set up database connection pool
    let manager = ConnectionManager::<SqliteConnection>::new(database_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    // initialize Tera for templating
    let tera = Tera::new("templates/**/*.html").expect("Parsing error in templates directory");


    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(tera.clone()))
            .route("/", web::get().to(index))
            .route("/add", web::get().to(add_post))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}