use bevy::{
    prelude::*,
    winit::WinitSettings
};

const INITIAL_WINDOW_WIDTH: f32 = 240.0;
const INITIAL_WINDOW_HEIGHT: f32 = 480.0;

const BASIC_FONT: &str = "fonts/FiraSans-Bold.ttf";
const NORMAL_BUTTON: Color = Color::rgb(0.15, 0.15, 0.15);
const HOVERED_BUTTON: Color = Color::rgb(0.25, 0.25, 0.25);
const PRESSED_BUTTON: Color = Color::rgb(0.35, 0.75, 0.35);

const INITIAL_STATE: State = State {
    input: String::new(),
    items: Vec::new(),
};

struct State {
    input: String,
    items: Vec<Item>,
}

struct Item {
    text: String,
    done: bool,
}

fn main() {
    App::new()
        .insert_resource(WindowDescriptor {
            width: INITIAL_WINDOW_WIDTH,
            height: INITIAL_WINDOW_HEIGHT,
            // transparent: true,
            // decorations: false,
            ..Default::default()
        })
        .add_plugins(DefaultPlugins)
        .insert_resource(WinitSettings::desktop_app())
        .insert_resource(INITIAL_STATE)
        .add_startup_system(setup)
        .add_system(text_input)
        .add_system(button_system)
        .run();
}

/// prints every char coming in; press enter to echo the full string
fn text_input(
    mut char_evr: EventReader<ReceivedCharacter>,
    keys: Res<Input<KeyCode>>,
    // mut string: Local<String>,
    mut state: ResMut<State>,
) {
    for ev in char_evr.iter() {
        println!("Got char: '{}'", ev.char);
        state.input.push(ev.char);
    }

    if keys.just_pressed(KeyCode::Return) {
        println!("Text input: {}", state.input);
        state.items.push(Item {
            text: "".to_string(),// state.input,
            done: false,
        });
        state.input.clear();
    }
}

// fn scoreboard_system(state: Res<State>, mut query: Query<&mut Text>) {
//     let mut text = query.single_mut().unwrap();
//     text.sections[0].value = format!("Score: {}", scoreboard.score);
// }

fn button_system(
    mut interaction_query: Query<
        (&Interaction, &mut UiColor, &Children),
        (Changed<Interaction>, With<Button>),
    >,
    mut text_query: Query<&mut Text>,
) {
    for (interaction, mut color, children) in interaction_query.iter_mut() {
        let mut text = text_query.get_mut(children[0]).unwrap();
        match *interaction {
            Interaction::Clicked => {
                text.sections[0].value = "Press".to_string();
                *color = PRESSED_BUTTON.into();
            }
            Interaction::Hovered => {
                text.sections[0].value = "Hover".to_string();
                *color = HOVERED_BUTTON.into();
            }
            Interaction::None => {
                text.sections[0].value = "Button".to_string();
                *color = NORMAL_BUTTON.into();
            }
        }
    }
}

fn setup(mut commands: Commands, asset_server: Res<AssetServer>) {
    // ui camera
    commands.spawn_bundle(UiCameraBundle::default());
    commands
        .spawn_bundle(ButtonBundle {
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
            color: NORMAL_BUTTON.into(),
            ..default()
        })
        .with_children(|parent| {
            parent.spawn_bundle(TextBundle {
                text: Text::with_section(
                    "Button",
                    TextStyle {
                        font: asset_server.load(BASIC_FONT),
                        font_size: 40.0,
                        color: Color::rgb(0.9, 0.9, 0.9),
                    },
                    Default::default(),
                ),
                ..default()
            });
        });
}