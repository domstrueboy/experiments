use std::{fs, io};
use std::path::PathBuf;
use filetime::{set_file_mtime, FileTime};

fn folders(dir: &str) -> Result<Vec<PathBuf>, io::Error> {
    Ok(
        fs::read_dir(dir)?
            .into_iter()
            .filter(|r| r.is_ok()) // Get rid of Err variants for Result<DirEntry>
            .map(|r| r.unwrap().path()) // This is safe, since we only have the Ok variants
            .filter(|r| r.is_file()) // Filter out non-folders
            .filter(|r| !r.ends_with("jpg")) // Filter out non-jpgs
            .collect()
    )
}

fn main() {
    let paths = folders("./Pictures");

    for path in paths.unwrap() {
        println!("Name: {}", path.display());
        set_file_mtime(path, FileTime::now()).unwrap();
    }

}
