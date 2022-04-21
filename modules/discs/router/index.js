import express from "express";
import bodyParser from "body-parser";
import PubSub from "pubsub-js";
import { DISC_ADDED, DISC_DELETED, DISC_UPDATED } from "../events";
import { Disc } from "../model";

const DiscsRouter = express.Router();
const jsonParser = bodyParser.json();

DiscsRouter.get("/", (req, res) => {
  console.log("Fetching all discs...");

  Disc.find((error, discs) => {
    if (error)
      console.error("Error when attempting to fetch all discs", error);
    else {
      console.log(`Found ${discs.length} discs`);
      return discs;
    }
  })
    .then((discs) => res.send(discs))
    .catch((error) => res.status(500).send(error));
});

DiscsRouter.get("/:discId", (req, res) => {
  const { discId } = req.params;

  console.log(`Fetching disc with id ${discId}`);

  Disc.findById(discId, (error, disc) => {
    if (error) console.error("Error when attempting to fetch disc", error);
    else {
      console.log("Disc found");
      return disc;
    }
  })
    .then((disc) => res.send(disc)) 
    .catch((error) => res.status(500).send(error));
});


DiscsRouter.post("/", jsonParser, (req, res) => { 
    const newDisc = new Disc({
      ...req.body,
    });
    let result = newDisc.save((error, savedDisc) => {
      if (error) {
        console.error("Error while saving disc", error);
        return error;
      }

      console.log("Disc saved successfully");
      PubSub.publish(DISC_ADDED, savedDisc);
      return savedDisc;
    }).catch((error) => res.status(500).send(error));;

    res.send(result);
});

DiscsRouter.put("/:discId", jsonParser, (req, res) => {
  const { discId: id } = req.params;

  console.log(`Updating disc with id ${id}`);

  Disc.findByIdAndUpdate(id, { ...req.body }, (error, disc) => {
    if (error) console.error("Error when attempting to update disc", error);
    else {
      console.log("Disc updated");
      return disc;
    }
  })
    .then((disc) => {
      PubSub.publish(DISC_UPDATED, disc);
      res.send(disc);
    })
    .catch((error) => res.status(500).send(error));
});

DiscsRouter.delete("/:discId", (req, res) => {
  const { discId } = req.params;

  console.log(`Deleting disc with id ${discId}`);

  Disc.findByIdAndDelete(id, (error, disc) => {
    if (error) console.error("Error when attempting to delete disc", error);
    else {
      console.log("Disc deleted");
      return disc;
    }
  })
    .then((disc) => {
      PubSub.publish(DISC_DELETED, id);
      res.send(disc);
    })
    .catch((error) => res.status(500).send(error));
});

export default DiscsRouter;
