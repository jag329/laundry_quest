import { Actor, b2Vec2, CircleBody, FilledCircle, Projectile, ProjectileMovement, stage } from "../jetlag";
import { Player } from "./Player";

export class SoapSud extends Actor {
    //statics
    static radius: number = 1;
    static tolerance: number = 0.25;
    static velocity: number = 50;
    static color: string = "#4287f5";
    static defaultVerticalBound: number = 1;
    static defaultRange: number = 200;

    //non-statics
    private range: number = SoapSud.defaultRange;


    /**
     * 
     * @param config 
     */
    public constructor(config: { cx: number, cy: number, range?: number, player: Player }) {
        super({
            appearance: new FilledCircle({
                radius: SoapSud.radius,
                lineWidth: 0.5,
                lineColor: SoapSud.color
            }),
            rigidBody: new CircleBody({
                cx: config.cx,
                cy: config.cy,
                radius: SoapSud.radius - SoapSud.tolerance
            }),
            movement: new ProjectileMovement(),
            role: new Projectile({
                damage: 0,
                reclaimer: (actor: Actor) => {
                    //code to be run whenever the projectile is reclaimed
                    (actor as SoapSud).spawn()
                },
            })
        })

        if (config.range) {
            this.range = config.range;
        }

        //code to run before every frame
        this.role.prerenderTasks.push((_elapsedMs: number, actor?: Actor) => {
            if (!actor) {
                return;
            } else if (!actor.enabled) {
                return;
            }

            let role = actor.role as Projectile;
            let body = actor.rigidBody.body;

            //distance collision for now because I do not know how to detect collisions between Hero and Projectile roles.
            const sudPos = actor.rigidBody.getCenter();
            const playerPos = config.player.rigidBody.getCenter();
            const dx = sudPos.x - playerPos.x;
            const dy = sudPos.y - playerPos.y;
            const distSq = dx * dx + dy * dy;
            const combinedRadius = SoapSud.radius + Player.radius;

            if (distSq < combinedRadius * combinedRadius && role.reclaimer) {
                config.player.dropBasket();
                role.reclaimer(this);
                return;
            }


            let rx = Math.abs(body.GetPosition().x - role.rangeFrom.x);
            let ry = Math.abs(body.GetPosition().y - role.rangeFrom.y);

            //soap sud is too far away, reclaim it
            if ((rx * rx + ry * ry) > (this.range * this.range) && role.reclaimer) {
                role.reclaimer(this);
            }

        });

        this.spawn();
    }

    /**
     * 
     * @param initial
     * @param verticalBound 
     * @param offsetX 
     */
    private spawn(verticalBound?: number, offsetX?: number) {
        if (!verticalBound) {
            verticalBound = SoapSud.defaultVerticalBound;
        }
        if (!offsetX) {
            offsetX = verticalBound * Math.random()
        }

        let x = 160 + offsetX
        let y = verticalBound + (Math.random() * (90 - verticalBound));
        this.rigidBody.setCenter(x, y);
        this.rigidBody.setVelocity(new b2Vec2(-SoapSud.velocity, 0)); // it seems like manually setting the velocity is throwing some stuff off...
        (this.role as Projectile).rangeFrom.Set(x, y); //have to manually set since it wasn't actually "thrown"
        this.enabled = true;
    }
}