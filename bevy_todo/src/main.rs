use bevy::{
    prelude::*,
    winit::WinitSettings
};

const INITIAL_WINDOW_WIDTH: f32 = 240.0;
const INITIAL_WINDOW_HEIGHT: f32 = 480.0;
const BASIC_FONT: &str = "fonts/FiraSans-Bold.ttf";

struct State {
    input: String,
    items: Vec<Item>,
}

struct Item {
    text: String,
    done: bool,
}

const INITIAL_STATE: State = State {
    input: String::new(),
    items: Vec::new(),
};

#[derive(Component)]
struct InputField;

fn main() {
    App::new()
        .insert_resource(WindowDescriptor {
            width: INITIAL_WINDOW_WIDTH,
            height: INITIAL_WINDOW_HEIGHT,
            ..Default::default()
        })
        .add_plugins(DefaultPlugins)
        .insert_resource(WinitSettings::desktop_app())
        .insert_resource(INITIAL_STATE)
        .add_startup_system(setup)

        .add_system(text_input_system)
        .run();
}

/// prints every char coming in; press enter to echo the full string
fn text_input_system(
    mut char_evr: EventReader<ReceivedCharacter>,
    keys: Res<Input<KeyCode>>,
    // mut state: ResMut<State>,
    mut query: Query<&mut Text, With<InputField>>
) {
    for ev in char_evr.iter() {
        println!("Got char: '{}'", ev.char);
        // state.input.push(ev.char);

        for mut text in query.iter_mut() {
            text.sections[0].value.push(ev.char);
        }
    }

    if keys.just_pressed(KeyCode::Return) {

        // for mut text in query.iter_mut() {
        //     println!("Text input: {:?}",  text.sections[0].value);
        // }

        // println!("Text input: {}", state.input);
        // let text = state.input.clone();
        // state.items.push(Item {
        //     text,
        //     done: false,
        // });
        // state.input.clear();
    }
}

fn setup(
    mut commands: Commands,
    state: Res<State>,
    asset_server: Res<AssetServer>,
) {
    commands.spawn_bundle(UiCameraBundle::default());

    commands
        .spawn_bundle(TextBundle {
            style: Style {
                size: Size::new(Val::Px(150.0), Val::Px(65.0)),
                // center button
                margin: Rect::all(Val::Auto),
                // horizontally center child text
                justify_content: JustifyContent::Center,
                // vertically center child text
                align_items: AlignItems::Center,
                ..default()
            },
            text: Text::with_section(
                &state.input,
                TextStyle {
                    font: asset_server.load(BASIC_FONT),
                    font_size: 40.0,
                    color: Color::rgb(0.9, 0.9, 0.9),
                },
                Default::default(),
            ),
            ..default()
        })
        .insert(InputField);
}