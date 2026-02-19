import { Machine } from "./Machine"
import { LaundryBasket, BasketStatus } from "./LaundryBasket";

export class WashingMachine extends Machine {
    constructor(config: { color: string, cx: number, cy: number }) {
        super({
            ...config,
            width: 15,
            height: 15,
            name: "Washing Machine"
        })
    }

    public putInLaundry(basket: LaundryBasket): boolean {
        if (this.hasLaundry || basket.getStatus() !== BasketStatus.Dirty) {
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
        basket.updateStatus(BasketStatus.Wet);

        return true;
    }
}