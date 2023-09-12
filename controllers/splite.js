const SpliteSchema= require("../models/SpliteModel")
exports.addSplite = async (req, res) => {
    const {title,amount,date,description,persons}  = req.body

    const splite = SpliteSchema({
      title,
      amount,
      date,
      persons,
      description 
    })
    try {
        //validations
        if(!title || !amount || !description || !date || !persons){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await splite.save()
        res.status(200).json({message: 'Splite Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(splite)
}

exports.getSplite = async (req, res) =>{
    try {
        const splite = await SpliteSchema.find()
        .populate('persons').sort({createdAt: -1})
        res.status(200).json(splite)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteSplite = async (req, res) =>{
    const {id} = req.params;
    SpliteSchema.findByIdAndDelete(id)
        .then((splite) =>{
            res.status(200).json({message: 'Splite Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}