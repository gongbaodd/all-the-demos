use std::{future, time::Duration};

use gloo_timers::future::TimeoutFuture;
use leptos::{leptos_dom::helpers::TimeoutHandle, *};

async fn fake_token() -> String {
    TimeoutFuture::new(1000).await;
    "fake token".to_string()
}

#[component]
pub fn App(ctx: Scope) -> impl IntoView {
    let (tel, set_tel) = create_signal(ctx, "".to_string());
    let (code, set_code) = create_signal(ctx, "".to_string());
    let (apply_code, set_apply_code) = create_signal(ctx, false);
    let token = create_resource(ctx, apply_code, |apply_code| async move {
        if apply_code {
            fake_token().await
        } else {
            future::pending::<String>().await
        }
    });
    let (count, set_count) = create_signal(ctx, 60);

    view! {
        ctx,
        <form class="container">
            <div class="row">
                <label>"tel"
                    <input
                        type="text"
                        prop:value=tel
                        on:input= move |ev| {
                            set_tel(event_target_value(&ev))
                        } />
                </label>
            </div>
            <div class="row">
                <div class="col s10">
                    <label>"code"
                        <input
                            type="text"
                            prop:value=code disabled=move || token.read(ctx).is_none()
                            on:input=  move |ev| {
                                set_code(event_target_value(&ev));
                            }
                        />
                    </label>
                </div>
                <div class="col s2">
                    <button
                        class="waves-effect waves-light btn"
                        type="button"
                        disabled=move || tel().is_empty() || count() != 60
                        on:click=move |_| {
                            set_apply_code(true);
                            create_effect(ctx, move |prev: Option<TimeoutHandle>| {
                                if let Some(handler) = prev {
                                    handler.clear();
                                }

                                let count = count();

                                set_timeout_with_handle(
                                    move || {
                                        if apply_code() {
                                            if count == 0 {
                                                set_count(60);
                                                set_apply_code(false);
                                                return;
                                            }
                                            set_count(count - 1);
                                        }
                                    },
                                    Duration::from_secs(1),
                                ).expect("set interval failed")

                            })

                        }
                    >
                   {move || if count() == 60  {"send".to_string()} else { count().to_string() + "s"}}
                    </button>
                </div>
            </div>
            <div class="row">
                <button class="waves-effect waves-light btn" type="submit" disabled=move || token.read(ctx).is_none() || tel().is_empty() || code().is_empty() >"submit"</button>
            </div>
        </form>
    }
}
