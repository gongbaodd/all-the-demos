#![windows_subsystem = "windows"]

use eframe::egui;

fn main() {
    let option = eframe::NativeOptions::default();

    eframe::run_native(
        "Confirm text",
        option,
        Box::new(|_cc| Box::new(MyApp::default())),
    )
}

#[derive(Default)]
struct MyApp {
    can_exit: bool,
    is_existing: bool,
}

impl eframe::App for MyApp {
    fn on_exit_event(&mut self) -> bool {
        self.is_existing = true;
        self.can_exit
    }

    fn update(&mut self, ctx: &egui::Context, frame: &mut eframe::Frame) {
        egui::Window::new("Do you want to quit?")
            .collapsible(false)
            .resizable(false)
            .show(ctx, |ui| {
                if ui.button("Not yet").clicked() {
                    self.is_existing = false;
                }

                if ui.button("Yes").clicked() {
                    self.can_exit = true;
                    frame.quit();
                }
            });
    }
}
