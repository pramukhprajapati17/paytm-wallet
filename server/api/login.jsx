app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Fetch user data
        const userData = {
            f_name: user.f_name,
            l_name: user.l_name,
            unique_id: user.unique_id,
            email: user.email,
            address: user.address,
            mobile: user.mobile,
            balance: user.balance,
        };

        res.status(200).json({ message: 'Login successful', user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
});