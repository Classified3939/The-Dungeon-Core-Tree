class SpikeTrap extends TrapUnit{
    constructor(hitPoints = new Decimal(-1)){
        if (Decimal.lte(new Decimal(hitPoints),-1)){
            hitPoints = new Decimal(3);
        }
        super("spikeTrap","Spike Trap",new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(hitPoints));
    }
}

class CamoSpikeTrap extends TrapUnit{
    constructor(hitPoints = new Decimal(-1)){
        if (Decimal.lte(new Decimal(hitPoints),-1)){
            hitPoints = new Decimal(3);
        }
        super("camoSpikeTrap","Camouflaged Spike Trap",new Decimal(2), new Decimal(0), new Decimal(1), new Decimal(hitPoints));
    }
}

class SlipperyTrap extends TrapUnit{
    constructor(hitPoints = new Decimal(-1)){
        if (Decimal.lte(new Decimal(hitPoints),-1)){
            hitPoints = new Decimal(7);
        }
        super("slipTrap","Slippery Floor Trap", new Decimal(1),new Decimal(0),new Decimal(1), new Decimal(hitPoints));
    }
}

class ArrowShotTrap extends TrapUnit{
    constructor(hitPoints = new Decimal(-1)){
        if (Decimal.lte(new Decimal(hitPoints),-1)){
            hitPoints = new Decimal(1);
        }
        super("arrowTrap","Arrow Shooter Trap", new Decimal(5),new Decimal(0),new Decimal(1), new Decimal(hitPoints));
    }
}

const trapTypes = ["spikeTrap","camoSpikeTrap","slipTrap","arrowTrap"];