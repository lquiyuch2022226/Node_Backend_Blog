import mongoose from 'mongoose';

const PublicationSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title is required']
    },
    descript: {
        type: String,
        required: [true, 'The descript is required']
    },
    text: {
        type: String,
        required: [true, 'The text is required']
    },
    imagen: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
});

PublicationSchema.methods.toJSON = function(){
    const {__v, _id, ...publication} = this.toObject();
    publication.publication_id = _id;
    return publication;
}

export default mongoose.model('Publication', PublicationSchema)