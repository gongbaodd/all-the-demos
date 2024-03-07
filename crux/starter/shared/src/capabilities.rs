use crux_core::render::Render;
use crate::{event::Event, Counter};

#[cfg_attr(feature="typegen", derive(crux_core::macros::Export))]
#[derive(crux_core::macros::Effect)]
#[effect(app = "Counter")]
pub struct Capabilities {
    pub render: Render<Event>
}
