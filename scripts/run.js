const main = async () => {
    const [owner, superCoder] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    // Pass in "asuka" to the constructor when deploying
    const domainContract = await domainContractFactory.deploy("asuka");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
      
    // Pass in a second variable - value
    let txn = await domainContract.register("nico",  {value: hre.ethers.utils.parseEther('1234')});
    await txn.wait();

    // How much money is in here?
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  
    //Try to grab the funds from the contract!
    try{
        txn = await domainContract.connect(superCoder).withdraw();
        await txn.wait();
    }
    catch(error){
        console.log("Could not rob contract");
    }

    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

    txn = await domainContract.connect(owner).withdraw();
    await txn.wait();

    // Fetch balance of contract & owner
    const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
    console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

    const address = await domainContract.getAddress("nico");
    console.log("Owner of domain nico:", address);
  
    // const balance = await hre.ethers.provider.getBalance(domainContract.address);
    // console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
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