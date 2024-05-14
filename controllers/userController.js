const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const createSecretToken = require('../jwtGeneration.js');

const findByName = async(username) => {

};

const checkIfExistsByName = async(username) => {

};

const create = async(username) => {

};

const editByName = async(currentUsername, newUsername) => {

};

const deleteByName = async (username) => {

};

module.exports = create, 
                 checkIfExistsByName,
                 findByName,
                 editByName,
                 deleteByName;