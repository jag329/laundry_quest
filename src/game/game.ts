import { Actor, BoxBody, CircleBody, FilledBox, FilledCircle, FilledPolygon, GridSystem, Hero, JetLagGameConfig, KeyCodes, ManualMovement, Obstacle, PolygonBody, initializeAndLaunch, stage } from "../jetlag";
import { LaundryBasket } from "./LaundryBasket";
import { Player } from "./Player";

/**
 * Screen dimensions and other game configuration, such as the names of all
 * the assets (images and sounds) used by this game.
 */
class Config implements JetLagGameConfig {
  // Use 16/9 for a game in landscape mode, and 9/16 for a game in portrait mode
  aspectRatio = { width: 16, height: 9 };
  // Make this `false` when you're done debugging your game and are ready to
  // share it with the world.
  hitBoxes = true;
}

/**
 * This function draws the first scene that shows when the game starts.  In this
 * code, it's an interactive world that cannot be won or lost.  After your game
 * starts becoming more polished, you will probably want to use several
 * functions like this one as a way to organize the parts of your game (levels,
 * chooser, welcome screen, store, etc).
 *
 * @param level Which level of the game should be displayed
 */
function builder(_level: number) {
  // Draw a grid on the screen, to help us think about the positions of actors.
  // Remember that when `hitBoxes` is true, clicking the screen will show
  // coordinates in the developer console.
  GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: 16, y: 9 });

  let laundryBasket = new LaundryBasket("#f86d6d", 5, 6);

  let player = new Player({
    color: "#ff5900",
    cx: 5,
    cy: 4
  })
  // Pressing a key will change the hero's velocity
  
}

// call the function that starts running the game in the `game-player` div tag
// of `index.html`
initializeAndLaunch("game-player", new Config(), builder);
