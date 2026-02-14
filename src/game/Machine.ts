import { Actor, BoxBody, FilledBox, InertMovement, ManualMovement, Obstacle, stage, TextSprite, TimedEvent } from "../jetlag";
import { LaundryBasket, BasketStatus } from "./LaundryBasket";
import { Player } from "./Player";

export abstract class Machine extends Actor {
    timeToComplete: number = 10;
    operation: TimedEvent | null = null;
    operationComplete: boolean = false;
    hasLaundry: boolean = false;
    name: string = "";

    public constructor(config: { color: string, cx: number, cy: number, width: number, height: number, name: string }) {
        super({
            appearance: [
                new FilledBox({
                    width: config.width,
                    height: config.height,
                    fillColor: config.color
                }),
                new TextSprite({
                    center: true,
                    face: "Arial",
                    color: "#000000",
                    size: 120
                }, config.name)],
            rigidBody: new BoxBody({
                cx: config.cx,
                cy: config.cy,
                width: config.width,
                height: config.height
            }),
            movement: new InertMovement,
            role: new Obstacle({
                heroCollision: (machine, player) => {
                    if ((player as Player).interacting && (player as Player).basket) {
                        if ((player as Player).basket?.getStatus() !== BasketStatus.Empty && !(machine as Machine).operation) {
                            (machine as Machine).putInLaundry((player as Player).basket!);
                        } else if ((player as Player).basket?.getStatus() === BasketStatus.Empty && (machine as Machine).operationComplete && (machine as Machine).hasLaundry) {
                            (machine as Machine).takeOutLaundry((player as Player).basket!);
                        }
                    }
                },
            })
        })

        this.name = config.name;
        
        // Now that this is initialized, set the dynamic producer for the TextSprite. We couldn't do this earlier due to the super call.
        (this.appearance[1] as TextSprite).producer = () => `${this.name}\n${this.operationComplete ? "Done" : "Not Done"}\n${this.hasLaundry ? "Full" : "Empty"}\n${this.operation ? "In Use" : "Available"}`;
    }

    public abstract putInLaundry(basket: LaundryBasket): boolean;

    public abstract takeOutLaundry(basket: LaundryBasket): boolean;

    public startOperation(onComplete?: () => void) {
        this.operationComplete = false;
        this.operation = new TimedEvent(this.timeToComplete, false, () => {
            this.operationComplete = true;
            if (onComplete) {
                onComplete();
            }
            this.operation = null;
        });
        stage.world.timer.addEvent(this.operation);
    }
}