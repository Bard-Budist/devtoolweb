#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::{fs::File, io::Write};

fn main() {
  tauri::Builder::default()
  // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![save_json_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn save_json_file(path: String, content: String) -> Result<(), String> {
  let mut file = File::create(path).unwrap();
  file.write_all(content.as_bytes()).unwrap();
  Ok(())
}