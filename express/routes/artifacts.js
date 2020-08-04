const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const Artifacts = 'includeAttributes' in req.query ?
		await models.Artifact.findAll({ include: models.Attribute }) :
		await models.Artifact.findAll();
	res.status(200).json(Artifacts);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const Artifact = 'includeAttributes' in req.query ?
		await models.Artifact.findByPk(id, { include: models.Attribute }) :
		await models.Artifact.findByPk(id);
	if (Artifact) {
		res.status(200).json(Artifact);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.Artifact.create(req.body);
		res.status(201).end();
	}
};

async function update(req, res) {
	const id = getIdParam(req);

	if (req.body.id === id) {
		await models.Artifact.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);
	await models.Artifact.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
