const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("asuka");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    let txn = await domainContract.register("rei",  {value: hre.ethers.utils.parseEther('1')});
    await txn.wait();
    console.log("Minted domain rei.asuka");
    
    txn = await domainContract.setRecord("banana", "Am I Rei or Asuka??");
    await txn.wait();
    console.log("Set record for rei.asuka");
  
    const address = await domainContract.getAddress("rei");
    console.log("Owner of domain rei:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();