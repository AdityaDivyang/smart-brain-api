import Clarifai from 'clarifai';

// *********The following is for setting up API*********
// const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

// const stub = ClarifaiStub.grpc();

// const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key {7d5aaebfa3344e2bbb75b27c03e4ccf1}");

const app = new Clarifai.App({
    apiKey: '7d5aaebfa3344e2bbb75b27c03e4ccf1'
});
  
// ******************************************************

export const handleApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}
  

export const handleImageCount = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => {
            res.status(400).json('unable to get entries');
        })

}