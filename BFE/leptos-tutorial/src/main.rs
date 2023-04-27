use components::App::*;
use leptos::*;

mod components;

fn main() {
    mount_to_body(|ctx| view! {ctx, <App />})
}
