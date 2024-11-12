# battery – livestreaming widget

A rechargeable battery widget to use on long livestreams as a visual reminder to take breaks.

Try out a [live version](https://mirthturtle.com/battery).

## Usage

In OBS, add a Browser source to a scene. Set the URL to the link above or, to run your own version, download this repo, choose "Local file" and select `battery.html`.

Cover up the controls on stream by placing the battery at the bottom of your scene, or, put the Browser source into a new Group and add a Color Source to cover the controls.

Operate the battery within OBS by right-clicking on the Browser source in the Sources list and selecting "Interact".

## Modifying

The CSS is provided in SCSS format for easier modification, but you'll need to compile any changes to CSS for use.

First [install sass](https://github.com/sass/dart-sass?tab=readme-ov-file#using-dart-sass), then navigate to the `battery` directory on your command line and run:
```
sass battery.scss:battery.css
```

## Credits & License

Battery design adapted from Steve Thorson's [CSS battery indicator](https://codepen.io/stevethorson/pen/JjXVoL).

This project is released under the MIT License.
