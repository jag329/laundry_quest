import {Actor, BoxBody, AppearanceComponent, FilledBox, StateEvent, StateManagerComponent, Passive, RoleComponent, Scene, InertMovement, MovementComponent, GestureHandlers, ManualMovement} from "../jetlag";

/**
 * Object to implement a laundry basket. 
 */
export class LaundryBasket extends Actor {
    static basketWidth: number = 10;
    static basketHeight: number = 5;

    public constructor(color: string, cx: number, cy: number) {
        super({
            //for now the appearance will be a 
            appearance: new FilledBox({
                width: LaundryBasket.basketWidth,
                height: LaundryBasket.basketHeight,
                fillColor: color
            }),
            rigidBody: new BoxBody({
                cx: cx, 
                cy: cy,
                width: LaundryBasket.basketWidth,
                height: LaundryBasket.basketHeight
            }),
            movement: new ManualMovement,
        })
    }
}