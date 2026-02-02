/**
 * The Global Checkout System
 * Uses Factory Method: PaymentGateway (Creator) creates PaymentProcessor (Product)
 * By Nico Guarnes
 */

// Part 1: Define the PaymentProcessor Interface
const PaymentProcessor = {
  process: function (amount) {},
};

/*------------ Concrete Processors ------------ */
class CreditCardProcessor {
  process(amount) {
    console.log(`Processing $${amount.toFixed(2)} via Credit Card`);
  }
}

class PayPalProcessor {
  process(amount) {
    console.log(`Processing $${amount.toFixed(2)} via PayPal`);
  }
}

function implementsInterface(obj, interfaceObj) {
  for (const method in interfaceObj) {
    if (!(method in obj) || typeof obj[method] !== "function") {
      return false;
    }
  }
  return true;
}
/*------------ Factory (Creator) Framework ------------ */
class PaymentGateway {
  createProcessor() {
    throw new Error("createProcessor() must be implemented by subclass");
  }

  executePayment(amount) {
    const processor = this.createProcessor();
    processor.process(amount);
  }
}

/*------------ Concrete Creators ------------*/
class CreditCardGateway extends PaymentGateway {
  createProcessor() {
    return new CreditCardProcessor();
  }
}

class PayPalGateway extends PaymentGateway {
  createProcessor() {
    return new PayPalProcessor();
  }
}

/*------------ Part 3: The "Client" Implementation ------------*/
function runCheckout(gateway) {
  gateway.executePayment(50.0);
}

/*------------ Part 4: Add Bitcoin ------------*/
class BitcoinProcessor {
  process(amount) {
    console.log(`Aha! You're using Bitcoin! Processing $${amount.toFixed(2)} via Bitcoin`);
  }
}

class BitcoinGateway extends PaymentGateway {
  createProcessor() {
    return new BitcoinProcessor();
  }
}

/*------------ Option Menu Demo / Main ------------*/
const readline = require('readline');

function promptMenu() {
  console.log("--- Global Checkout System ---\n");
  console.log("Choose a checkout option:\n");
  console.log("1. Test Credit Card (cc)");
  console.log("2. Test PayPal (paypal)");
  console.log("3. Test Bitcoin (btc)");
  console.log("4. Test All");
  console.log("0. Exit");
  console.log("Type 1, 2, 3, 4, or 0 and press ENTER.\n");
}

function handleSelection(answer) {
  switch(answer.trim()) {
    case '1':
      console.log("\nCheckout with Credit Card gateway:");
      runCheckout(new CreditCardGateway());
      break;
    case '2':
      console.log("\nCheckout with PayPal gateway:");
      runCheckout(new PayPalGateway());
      break;
    case '3':
      console.log("\nCheckout with Bitcoin gateway:");
      runCheckout(new BitcoinGateway());
      break;
    case '4':
      console.log("\nCheckout with Credit Card gateway:");
      runCheckout(new CreditCardGateway());
      console.log("\nCheckout with PayPal gateway:");
      runCheckout(new PayPalGateway());
      console.log("\nCheckout with Bitcoin gateway:");
      runCheckout(new BitcoinGateway());
      break;
    case '0':
      // Will be handled to exit
      return false;
    default:
      console.log("Invalid option. Please choose 1, 2, 3, 4, or 0.");
  }

  // Optional: verify interface implementation for option 1, 2, 3, or 4
  if (answer.trim() === '1' || answer.trim() === '4') {
    console.log("\n--- Interface check ---");
    const cc = new CreditCardProcessor();
    console.log(
      "CreditCardProcessor implements PaymentProcessor:",
      implementsInterface(cc, PaymentProcessor)
    );
  } else if (answer.trim() === '2') {
    console.log("\n--- Interface check ---");
    const paypal = new PayPalProcessor();
    console.log(
      "PayPalProcessor implements PaymentProcessor:",
      implementsInterface(paypal, PaymentProcessor)
    );
  } else if (answer.trim() === '3') {
    console.log("\n--- Interface check ---");
    const btc = new BitcoinProcessor();
    console.log(
      "BitcoinProcessor implements PaymentProcessor:",
      implementsInterface(btc, PaymentProcessor)
    );
  }
  return true;
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function ask() {
    promptMenu();
    rl.question('Option: ', (answer) => {
      if (answer.trim() === '0') {
        console.log("Goodbye! Salamat Shapi");
        rl.close();
        return;
      }
      handleSelection(answer);
      // Loop by asking again
      ask();
    });
  }
  ask();
}

main();
