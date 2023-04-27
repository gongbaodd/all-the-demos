use leptos::*;

#[component]
pub fn App(ctx: Scope) -> impl IntoView {
    let (count, set_count) = create_signal(ctx, 0);

    view! {
        ctx,
        <button
        on:click = move |_| {
            set_count.update(|n| *n += 1)
        }
        >
        "Click me:"
        {move || count.get()}
        </button>
    }
}
