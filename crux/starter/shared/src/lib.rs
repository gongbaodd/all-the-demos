pub mod app;
mod event;
mod model;
mod vmodel;
mod capabilities;

use lazy_static::lazy_static;
use wasm_bindgen::prelude::wasm_bindgen;

pub use app::*;
pub use crux_core::bridge::{Bridge, Request};
pub use crux_core::Core;

use crate::capabilities::{Capabilities, Effect};

uniffi::include_scaffolding!("shared");

lazy_static! {
    static ref CORE: Bridge<Effect, Counter> = Bridge::new(
        Core::new::<Capabilities>(),
    );
}

#[wasm_bindgen]
pub fn process_event(data: &[u8]) -> Vec<u8> {
    CORE.process_event(data)
}

#[wasm_bindgen]
pub fn handle_response(uuid: &[u8], data: &[u8]) -> Vec<u8> {
    CORE.handle_response(uuid, data)
}

#[wasm_bindgen]
pub fn view() -> Vec<u8> {
    CORE.view()
}