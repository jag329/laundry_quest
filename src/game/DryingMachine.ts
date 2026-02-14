import { Machine } from "./Machine"
import { LaundryBasket, BasketStatus } from "./LaundryBasket";

export class DryingMachine extends Machine {
    constructor(config: { color: string, cx: number, cy: number }) {
        super({
            ...config,
            width: 15,
            height: 15,
            name: "Drying Machine"
        })
    }

    putInLaundry(basket: LaundryBasket): boolean {
        if (this.hasLaundry || basket.getStatus() !== BasketStatus.Wet) {
            return false;
        }

        this.hasLaundry = true;
        basket.updateStatus(BasketStatus.Empty);

        this.startOperation(() => {}); //nothing for now, but we can add a SFX or something

        return true;
    }

    public takeOutLaundry(basket: LaundryBasket): boolean {
        if (!this.hasLaundry || !this.operationComplete || basket.getStatus() !== BasketStatus.Empty) {
            return false;
        }

        this.hasLaundry = false;
        this.operationComplete = false;
        basket.updateStatus(BasketStatus.Clean);

        return true;
    }
}