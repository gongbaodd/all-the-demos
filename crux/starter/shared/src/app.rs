use crux_core::App;
use crate::{capabilities::Capabilities, event::Event, model::Model, vmodel::ViewModel};


#[derive(Default)]
pub struct Counter;

impl App for Counter {
    type Event = Event;
    type Model = Model;
    type ViewModel = ViewModel;
    type Capabilities = Capabilities;

    fn update(
        &self, 
        event: Self::Event, 
        model: &mut Self::Model,
        caps: &Self::Capabilities
    ) {
        match event {
            Event::Increment => model.count += 1,
            Event::Decrement => model.count -= 1,
            Event::Reset => model.count = 0
        };

        caps.render.render();
    }

    fn view(&self, model: &Self::Model) -> Self::ViewModel {
        ViewModel {
            count: format!("Count is: {}", model.count),
        }
    }
}