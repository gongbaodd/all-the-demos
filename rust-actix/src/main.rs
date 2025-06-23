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

    let results = web::block(move || posts.limit(5).load::<Post>(&mut conn))
        .await
        .map_err(|e| HttpResponse::InternalServerError().body(format!("Error fetching posts: {:?}", e)))
        .unwrap(); // Simplified error handling for brevity

    let mut context = Context::new();
    context.insert("posts", &results);
    
    tera.render("index.html", &context)
        .map_err(|e| HttpResponse::InternalServerError().body(format!("Template error: {:?}", e)))
        .unwrap() // Simplified error handling for brevity
}

async fn add_post(pool: web::Data<DbPool>) -> impl Responder {
    use crate::schema::posts;

    let mut conn = pool.get().expect("Couldn't get db connection from pool");

    let new_post = NewPost {
        title: "My First Post".to_string(),
        body: "This is the content of my first post.".to_string(),
    };

    web::block(move || diesel::insert_into(posts::table).values(&new_post).execute(&mut conn))
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