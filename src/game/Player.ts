import { Actor, BoxBody, KeyCodes, AppearanceComponent, FilledBox, stage, Hero, StateEvent, StateManagerComponent, Passive, RoleComponent, Scene, InertMovement, MovementComponent, GestureHandlers, ManualMovement, TextSprite, FilledCircle, CircleBody } from "../jetlag";
import { LaundryBasket } from "./LaundryBasket";

export class Player extends Actor {
    static radius: number = 5;
    static moveSpeed: number = 50;

    interacting: boolean = false;

    basket: LaundryBasket | null = null;

    public constructor(config: { color: string, cx: number, cy: number }) {

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
            }, {
                collisionsEnabled: false,
            }),
            role: new Hero(),
            movement: new ManualMovement
        })

        this.setKeyHandlers();
    }

    private setKeyHandlers() {
        stage.keyboard.setKeyUpHandler(KeyCodes.KEY_UP, () => (this.movement as ManualMovement).updateYVelocity(0));
        stage.keyboard.setKeyUpHandler(KeyCodes.KEY_DOWN, () => (this.movement as ManualMovement).updateYVelocity(0));
        stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => (this.movement as ManualMovement).updateXVelocity(0));
        stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => (this.movement as ManualMovement).updateXVelocity(0));
        stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => (this.movement as ManualMovement).updateYVelocity(-Player.moveSpeed));
        stage.keyboard.setKeyDownHandler(KeyCodes.KEY_DOWN, () => (this.movement as ManualMovement).updateYVelocity(Player.moveSpeed));
        stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => (this.movement as ManualMovement).updateXVelocity(-Player.moveSpeed));
        stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => (this.movement as ManualMovement).updateXVelocity(Player.moveSpeed));
        stage.keyboard.setKeyDownHandler(KeyCodes.KEY_E, () => {
            this.interacting = true;
        });
        stage.keyboard.setKeyUpHandler(KeyCodes.KEY_E, () => {
            this.interacting = false;
        });
        stage.keyboard.setKeyDownHandler(KeyCodes.KEY_Q, () => {
            this.dropBasket();
        });
    }

    pickUpBasket(basket: LaundryBasket) {
        this.basket = basket;
        this.interacting = false; // stop interacting after picking up the basket to prevent accidentally dropping it immediately
    }

    dropBasket(removeFromScene: boolean = false) {
        if (this.basket) {
            this.basket.drop();
            if (removeFromScene) {
                this.basket.remove();
            }
            this.basket = null;
        }
    }

    /**
     * Update the basket position to match the player's position
     * This should be called each frame to keep the basket bound to the player
     */
    updateBasket() {
        if (this.basket) {
            const playerPos = this.rigidBody.getCenter();
            this.basket.rigidBody.setCenter(playerPos.x, playerPos.y + 5);
        }
    }
}