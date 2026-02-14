import { Actor, BoxBody, FilledBox, InertMovement, Obstacle, TextSprite } from "../jetlag";
import { LaundryBasket } from "./LaundryBasket";
import { Player } from "./Player";

export class Orderer extends Actor {
    color: string;
    generatedBasket: boolean = false;

    constructor(config: { color: string, cx: number, cy: number, width: number, height: number }) {
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
                }, "Orderer")],
            rigidBody: new BoxBody({
                cx: config.cx,
                cy: config.cy,
                width: config.width,
                height: config.height
            }),
            movement: new InertMovement,
            role: new Obstacle({
                heroCollision: (orderer, player) => {
                    if ((player as Player).interacting) {
                        if (!(orderer as Orderer).generatedBasket) {
                            const basket = (orderer as Orderer).generateBasket({ x: 20, y: 0 });
                        } else if ((player as Player).basket?.getStatus() === "Clean" && (player as Player).basket?.color === (orderer as Orderer).color) {
                            (player as Player).dropBasket(true);
                            (orderer as Orderer).generatedBasket = false;
                            (player as Player).interacting = false; // stop interacting after dropping the basket to prevent accidentally picking up another one immediately
                        }
                    }
                    
                }
            })
        })

        this.color = config.color;
    }

    public generateBasket(offset: { x: number, y: number }): LaundryBasket {
        this.generatedBasket = true;
        const pos = this.rigidBody.getCenter();
        return new LaundryBasket(this.color, pos.x + offset.x, pos.y + offset.y);
    }



    //just took this from AI honestly, makes a light color so that the text is visible on it. 
    private static generateRandomLightColor(): string {
        let color = '#';
        for (let i = 0; i < 3; i++) {
            // Generate values from 150-255 to ensure lighter colors 
            const value = Math.floor(Math.random() * 106) + 150;
            color += value.toString(16).padStart(2, '0');//converts decimal to hexadecimal, pads with 0 if necessary (for hexadecimal color values)
        }
        return color;
    }

    static generateRandomOrderer(config: {cx: number, cy: number, width: number, height: number}): Orderer {
        return new Orderer({
            color: Orderer.generateRandomLightColor(),
            cx: config.cx,
            cy: config.cy,
            width: config.width,
            height: config.height
        });
    }
}