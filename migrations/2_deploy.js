const stake = artifacts.require("stake");
const landstake = artifacts.require("LandTokenStake")
const buyback = artifacts.require("buyback");
//const BUSD = artifacts.require("BUSD")

module.exports = async function(deployer) {
	//deploy Token

	await deployer.deploy(landstake, "0x9D986A3f147212327Dd658F712d5264a73a1fdB0", "0x0734F6BA6445289a2C45Cd846e84944132a33338")
	const LS = await landstake.deployed()
	
	await deployer.deploy(buyback, "0x9D986A3f147212327Dd658F712d5264a73a1fdB0", LS.address)
	const bb = await buyback.deployed()

	await deployer.deploy(stake, "0x9D986A3f147212327Dd658F712d5264a73a1fdB0", bb.address, "0x0734F6BA6445289a2C45Cd846e84944132a33338")


};
