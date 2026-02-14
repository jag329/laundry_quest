import { Actor, BoxBody, KeyCodes, AppearanceComponent, FilledBox, stage, Hero, StateEvent, StateManagerComponent, Passive, RoleComponent, Scene, InertMovement, MovementComponent, GestureHandlers, ManualMovement, TextSprite, FilledCircle, CircleBody } from "../jetlag";
import { LaundryBasket } from "./LaundryBasket";

export class Player extends Actor {
    static radius: number = 0.5
    static moveSpeed: number = 5;

    public constructor(config: {color: string, cx: number, cy: number}) {
        
        /*
        let hero = new Actor({
            appearance: new FilledCircle({ radius: .5, fillColor: "#ff0000", lineWidth: .04, lineColor: "#00ff00" }),
            rigidBody: new CircleBody({ cx: 5, cy: 2, radius: .5 }),
            role: new Hero(),
            movement: new ManualMovement(),
          });
        */
        super({
            appearance: new FilledCircle({
                radius: Player.radius,
                fillColor: config.color
            }),
            rigidBody: new CircleBody({
                cx: config.cx,
                cy: config.cy,
                radius: Player.radius,
            }),
            role: new Hero(),
            movement: new ManualMovement
        })

        stage.keyboard.setKeyUpHandler(KeyCodes.KEY_UP, () => (this.movement as ManualMovement).updateYVelocity(0));
        stage.keyboard.setKeyUpHandler(KeyCodes.KEY_DOWN, () => (this.movement as ManualMovement).updateYVelocity(0));
        stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => (this.movement as ManualMovement).updateXVelocity(0));
        stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => (this.movement as ManualMovement).updateXVelocity(0));
        stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => (this.movement as ManualMovement).updateYVelocity(-Player.moveSpeed));
        stage.keyboard.setKeyDownHandler(KeyCodes.KEY_DOWN, () => (this.movement as ManualMovement).updateYVelocity(Player.moveSpeed));
        stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => (this.movement as ManualMovement).updateXVelocity(-Player.moveSpeed));
        stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => (this.movement as ManualMovement).updateXVelocity(Player.moveSpeed));
    }

    public interact() {
        
    }
}