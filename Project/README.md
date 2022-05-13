# CSC 2463 Systems Integration Project: Duck Hunt 2022
The goal of this project was to create a shoot-em-up game similar to the arcade classic Duck Hunt, using the code from Bug Squish as a base. The game takes input from an Arduino, displays graphics with p5.js, and handles sound effects with Tone.js.

## Graphical/Gameplay Components

The game has three states:
- a start screen state

![Start screen](/Project/images/Screenshot_2.png)
- the main gameplay state

![Gameplay](/Project/images/Screenshot_3.png)
- the 'game over' state

![Game over](/Project/images/Screenshot_4.png)

During gameplay, ducks move back and forth across the screen while the player controls a crosshair. Pressing the spacebar will fire at the ducks and deplete ammo, awarding score on a hit.

After four shots, the player must move the crosshair to the Reload button and 'fire' at it to refill their ammo.

Hitting ducks causes all remaining ducks to speed up, and hitting all ducks onscreen will spawn a new wave of ducks.

The player has 60 seconds to get as high a score as possible.

## Audio Components

The audio integration on this project was somewhat limited, and hampered by the fact that I could not get Tone to import properly. The main components were:
- a background music loop
- a 'firing' sound effect based off of an `FMSynth` tone, modulated based on whether or not the player has ammo remaining

## Physical Components

The circuit structure of the project was relatively simple:
- an ELEGOO Uno Rev.3 mainboard
- a PS2 joystick module to get user input
- a red LED to provide colorful feedback when firing

![Schematic](/Project/images/Screenshot_5.png)
