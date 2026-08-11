const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Shopping Cart using Arrays and Objects
let cart = [];
let appliedCoupon = null;

// Available Coupons
const COUPONS = {
    'SAVE10': { type: 'percent', value: 10 },
    'SUPER20': { type: 'percent', value: 20 },
    'FLAT50': { type: 'fixed', value: 50 },
    'WELCOME10': { type: 'fixed', value: 10 }
};

function askItem() {
    rl.question('Enter product name (or type "done" to finish): ', (name) => {
        if (name.toLowerCase() === 'done') {
            askCoupon();
            return;
        }

        rl.question('Enter product price: ', (priceInput) => {
            const price = parseFloat(priceInput);
            if (isNaN(price)) {
                console.log("Invalid price. Please enter a number.");
                return askItem(); // Retry
            }

            rl.question('Enter product quantity: ', (qtyInput) => {
                const quantity = parseInt(qtyInput, 10);
                if (isNaN(quantity)) {
                    console.log("Invalid quantity. Please enter a number.");
                    return askItem(); // Retry
                }

                // Add item to cart
                cart.push({ name, price, quantity });
                console.log(`Added ${quantity}x '${name}' to the cart.\n`);
                
                // Ask for the next item
                askItem(); 
            });
        });
    });
}

function askCoupon() {
    rl.question('Enter coupon code (SAVE10, SUPER20, FLAT50) or press Enter to skip: ', (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode && COUPONS[cleanCode]) {
            appliedCoupon = { code: cleanCode, ...COUPONS[cleanCode] };
            console.log(`✓ Coupon '${cleanCode}' applied!\n`);
        } else if (cleanCode) {
            console.log("Invalid coupon code. Continuing without coupon...\n");
        }
        calculateAndPrint();
        rl.close();
    });
}

function calculateAndPrint() {
    if (cart.length === 0) {
        console.log("\nYour cart is empty!");
        return;
    }

    console.log("\n--- Receipt ---");
    cart.forEach(item => {
        console.log(`${item.name} - $${item.price} x ${item.quantity}`);
    });
    console.log("---------------");

    // Calculate total using array method
    let total = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    // Apply 10% discount if total is more than 1000
    let bulkDiscount = 0;
    if (total > 1000) {
        bulkDiscount = total * 0.10;
    }

    // Apply coupon discount
    let couponDiscount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.type === 'percent') {
            couponDiscount = (total - bulkDiscount) * (appliedCoupon.value / 100);
        } else if (appliedCoupon.type === 'fixed') {
            couponDiscount = Math.min(appliedCoupon.value, total - bulkDiscount);
        }
    }

    let finalAmount = total - bulkDiscount - couponDiscount;

    console.log(`Total Amount: ${total}`);
    if (bulkDiscount > 0) {
        console.log(`Bulk Discount (10%): ${bulkDiscount}`);
    }
    if (appliedCoupon) {
        console.log(`Coupon Discount (${appliedCoupon.code}): ${couponDiscount}`);
    }
    console.log(`Final Amount: ${finalAmount}`);
}

console.log("=========================================");
console.log("    Pranav Lakhe | PRN: 24070521248");
console.log("=========================================");
console.log("--- Shopping Cart Calculator ---");
askItem();
