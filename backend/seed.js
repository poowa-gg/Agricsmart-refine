const { Farmer, Vendor, Program, Voucher, Transaction, Alert, sequelize } = require('./src/models');
const { generateVoucherCode } = require('./src/utils/voucherEngine');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database cleared and synced for seeding');

        // 1. Seed 10 Vendors
        const vendors = [];
        for (let i = 1; i <= 10; i++) {
            vendors.push(await Vendor.create({
                business_name: `Agro-Dealer ${i}`,
                shop_location: `Market Square, Zone ${i}`,
                product_category: i % 2 === 0 ? 'Fertilizers' : 'Seeds',
                bank_name: 'Partner Bank',
                account_number: `00112233${i.toString().padStart(2, '0')}`,
                account_name: `Agro-Dealer ${i} Global`,
                contact_info: `+234800112233${i}`,
                status: 'Approved'
            }));
        }

        // 2. Seed 1 Agricultural Program
        const program = await Program.create({
            name: 'National Maize Support 2026',
            description: 'Subsidized inputs for smallholder maize farmers in Northern regions.',
            target_region: 'Kano, Kaduna, Jigawa',
            voucher_value: 50000.00,
            input_category: 'Fertilizers & Seeds',
            start_date: new Date(),
            end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
            approved_vendors: vendors.map(v => v.id),
            status: 'Active'
        });

        // 3. Seed 100 Farmers
        const farmers = [];
        for (let i = 1; i <= 100; i++) {
            farmers.push(await Farmer.create({
                farmer_id: `FARM-${i.toString().padStart(4, '0')}`,
                name: `Farmer ${i} Musa`,
                phone: `+23481${Math.floor(10000000 + Math.random() * 90000000)}`,
                state: 'Kano',
                lga: i % 5 === 0 ? 'Dala' : 'Gwale',
                village: 'Sabuwar Gari',
                crop_type: 'Maize',
                farm_size: 1.5 + Math.random() * 5,
                national_id: `NIN-${Math.floor(100000000 + Math.random() * 900000000)}`,
                status: 'Active'
            }));
        }

        // 4. Issue Vouchers to all 100 farmers
        const vouchers = [];
        for (const farmer of farmers) {
            vouchers.push(await Voucher.create({
                voucher_code: generateVoucherCode(),
                program_id: program.id,
                farmer_id: farmer.id,
                expiry_date: program.end_date,
                status: 'Issued'
            }));
        }

        // 5. Generate 80 voucher redemptions (evenly spread among vendors)
        for (let i = 0; i < 80; i++) {
            const voucher = vouchers[i];
            const vendor = vendors[i % 10];

            voucher.status = 'Redeemed';
            voucher.vendor_id = vendor.id;
            voucher.redemption_date = new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000); // within last 10 days
            await voucher.save();

            await Transaction.create({
                voucher_id: voucher.id,
                vendor_id: vendor.id,
                farmer_id: voucher.farmer_id,
                amount: program.voucher_value,
                timestamp: voucher.redemption_date
            });
        }

        // 6. Create 5 anomaly alerts (suspicious behavior simulations)
        // - Rapid burst
        await Alert.create({
            type: 'RAPID_BURST_REDEMPTION',
            description: `Vendor ${vendors[0].business_name} redeemed 3 vouchers in 45 seconds.`,
            severity: 'High',
            status: 'New'
        });
        // - High frequency
        await Alert.create({
            type: 'HIGH_FREQUENCY_REDEMPTION',
            description: `Vendor ${vendors[1].business_name} exceeded 20 redemptions per hour.`,
            severity: 'Critical',
            status: 'New'
        });
        // - Duplicate beneficiary
        await Alert.create({
            type: 'DUPLICATE_BENEFICIARY_REDEMPTION',
            description: `Farmer ${farmers[50].name} attempted redemption on two different devices.`,
            severity: 'Medium',
            status: 'Reviewed'
        });
        // - Location mismatch
        await Alert.create({
            type: 'LOCATION_MISMATCH',
            description: `Redemption at Vendor ${vendors[2].business_name} occurred outside approved GPS fence.`,
            severity: 'High',
            status: 'New'
        });
        // - Unusual amount
        await Alert.create({
            type: 'UNUSUAL_TRANSACTION_VALUE',
            description: `Voucher value tampered detection for Transaction REF-${Math.random().toString(36).toUpperCase().slice(2, 8)}`,
            severity: 'Critical',
            status: 'New'
        });

        console.log('Demo data seeded successfully');
        process.exit(0);

    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
