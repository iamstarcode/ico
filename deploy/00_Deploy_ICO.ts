import { DeployFunction } from "hardhat-deploy/types"
import { verify } from "../helper-functions"
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config"

const func: DeployFunction = async ({ deployments, getNamedAccounts, network }) => {
    const { deployer, log } = await getNamedAccounts()
    const { deploy } = deployments

    const args = ["0xCF88fBdDB97Cf5D6A4B127b654cA892132b4a1c2"]

    const waitConfirmation = developmentChains.includes(network.name) ? 1 : 3

    const cryptoDevsToken = await deploy("CryptoDevToken", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitConfirmation,
    })

    if (!developmentChains.includes(network.name)) {
        await verify(cryptoDevsToken.address, args)
    }
}

func.tags = ["all", "nft"]
export default func
