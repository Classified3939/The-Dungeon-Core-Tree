class SpikeTrap extends TrapUnit{
    constructor(hitPoints = new Decimal(-1)){
        if (Decimal.lte(new Decimal(hitPoints),-1)){
            hitPoints = new Decimal(3);
        }
        super("spikeTrap","Spike Trap",new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(hitPoints));
    }
}