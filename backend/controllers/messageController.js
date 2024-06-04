const Conversation = require("../models/conversation");
const Message = require("../models/message");
const { getSocketReceiverId,io } = require("../socket/socket");

const sendMessage = async(req,res) => {
    try{
        const senderId = req.id;
        const receiverId = req.params.id;

        const {message} = req.body;
        
        let conversation  = await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            }
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(),newMessage.save()])
        
        const receiverSocketId = getSocketReceiverId(receiverId);

        if(receiverSocketId){
            
                io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(200).json({
            success:true,
            message:newMessage,
        })

        
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }


}

const getMessage = async(req,res) =>{
    try{
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages")
        
        if(!conversation){
            return res.status(200).json({
                success:true,
                messages:[]
            })
        }
        res.status(200).json({
            success:true,
            messages:conversation.messages
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    sendMessage,
    getMessage
}
