import { Actor, BoxBody, AppearanceComponent, FilledBox, StateEvent, StateManagerComponent, Passive, RoleComponent, Scene, InertMovement, MovementComponent, GestureHandlers, ManualMovement, TextSprite, Obstacle } from "../jetlag";
import { Player } from "./Player";

/**
 * Object to implement a laundry basket. 
 */
export class LaundryBasket extends Actor {
    static basketWidth: number = 10;
    static basketHeight: number = 5;

    readonly color: string;
    private status: BasketStatus = BasketStatus.Dirty;

    public constructor(color: string, cx: number, cy: number, status: BasketStatus = BasketStatus.Dirty) {
        super({
            //for now the appearance will be a 
            appearance: [
                new FilledBox({
                    width: LaundryBasket.basketWidth,
                    height: LaundryBasket.basketHeight,
                    fillColor: color,
                    lineWidth: 0.25,
                    lineColor: "#000000"
                }),
                new TextSprite({
                    center: true,
                    face: "Arial",
                    color: "#000000",
                    size: 100
                }, "Laundry Basket")],
            rigidBody: new BoxBody({
                cx: cx,
                cy: cy,
                width: LaundryBasket.basketWidth,
                height: LaundryBasket.basketHeight
            }),
            movement: new ManualMovement,
            role: new Obstacle({
                heroCollision: (laundry, player) => {
                    if ((player as Player).interacting) {
                        (player as Player).pickUpBasket((laundry as LaundryBasket));
                    }
                },
            })
        })

        this.status = status;
        this.color = color;

        // Now that "this" is initialized, we can set the dynamic producer
        (this.appearance[1] as TextSprite).producer = () => `Laundry Basket\n${this.status}`;
    }

    public updateStatus(status: BasketStatus) {
        this.status = status;
    }

    public getStatus(): BasketStatus {
        return this.status;
    }

    public equals(other: LaundryBasket) {
        return this.status === other.status && this.color === other.color;
    }

    /**
     * Drop the basket by moving it down and away from the player
     */
    public drop() {
        const currentPos = this.rigidBody.getCenter();
        this.rigidBody.setCenter(currentPos.x, currentPos.y + 10);
    }
}

export enum BasketStatus {
    Dirty = "Dirty",
    Wet = "Wet",
    Clean = "Clean",
    Empty = "Empty"
}