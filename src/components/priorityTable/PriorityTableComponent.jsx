import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/PriorityTable.scss';
import priorityData from '../../data/priority.json';
import propTypeChecking from '../../config/propTypeChecking';
import MetatypeDataCell from './MetatypeDataCell';
import MagicDataCell from './MagicDataCell';

import { setPriority } from '../../reducers/priorityTable';

const PriorityTableComponent = () => (
	<div className="col">
		<h2>Priority Table</h2>
		<table className="table table-responsive-xl table-bordered priority-table">
			<PriorityLabel />
			<tbody>
				<PriorityRow rating="A"	/>
				<PriorityRow rating="B" />
				<PriorityRow rating="C" />
				<PriorityRow rating="D"	/>
				<PriorityRow rating="E"	/>
			</tbody>
		</table>
	</div>
);

// helper function
const isActive = (active) => active ? 'table-success' : '';

const PriorityLabel = () => {
	return (
		<thead className="thead-inverse">
			<tr>
				<th>Priority</th>
				<th>Metatype</th>
				<th>Attributes</th>
				<th>Magic/Resonance</th>
				<th>Skills</th>
				<th>Resources</th>
			</tr>
		</thead>
	);
};


const AttributeDataCell = ({rating, active, changePriority}) => {
	return (
		<td
			className={isActive(active)}>
			<button
				className="prioritytable--btn-select btn btn-link"
				onClick={() => {
					changePriority({
						type: 'SET_PRIORITY',
						category: 'attribute',
						rating,
					});
				}}>
				{priorityData[rating].attributes}
			</button>
		</td>
	);
};

const SkillsDataCell = ({rating, active, changePriority}) => {
	const skillgroups = priorityData[rating].skills.grouppoints;

	return (
		<td
			className={isActive(active)}>
			<button
				className="prioritytable--btn-select btn btn-link"
				onClick={() => {
					changePriority({
						type: 'SET_PRIORITY',
						category: 'skills',
						rating,
					});
				}}>
				{priorityData[rating].skills.skillpoints}{skillgroups ? <span>/{skillgroups}</span> : null}
			</button>
		</td>
	);
};

const ResourcesDataCell = ({rating, active, changePriority}) => {
	return (
		<td
			className={isActive(active)}
			>
			<button
				className="prioritytable--btn-select btn btn-link"
				onClick={() => {
					changePriority({
						type: 'SET_PRIORITY',
						category: 'resources',
						rating,
					});
				}}
			>
				{priorityData[rating].resources}&yen;
			</button>
		</td>);
};

const PriorityRow = ({rating}) => {
	const priorityTableData = useSelector(state => state.priorityTable);
	const dispatch = useDispatch();
	const changePriority = priorityData => dispatch(setPriority(priorityData));

	return (
		<tr>
			<th>{rating}</th>
			<MetatypeDataCell
				rating={rating}
				active={priorityTableData.metatype === rating}
				changePriority={changePriority}
			/>
			<AttributeDataCell
				rating={rating}
				active={priorityTableData.attribute === rating}
				changePriority={changePriority}
			/>
			<MagicDataCell
				isActive={isActive(priorityTableData.magres === rating)}
				rating={rating}
				changePriority={changePriority}
			/>
			<SkillsDataCell
				rating={rating}
				active={priorityTableData.skills === rating}
				changePriority={changePriority}
			/>
			<ResourcesDataCell
				rating={rating}
				active={priorityTableData.resources === rating}
				changePriority={changePriority}
			/>
		</tr>
	);
};

PriorityRow.propTypes = {
	rating: PropTypes.string.isRequired,
	priorityTableData: propTypeChecking.priorityTable.isRequired,
	changePriority: PropTypes.func.isRequired,
};

const PropsToChangePriority = {
	changePriority: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired,
	rating: PropTypes.string.isRequired,
};
ResourcesDataCell.propTypes = PropsToChangePriority;
SkillsDataCell.propTypes = PropsToChangePriority;
AttributeDataCell.propTypes = PropsToChangePriority;

PriorityTableComponent.displayName = 'PriorityTableComponent';

PriorityTableComponent.propTypes = {
	changePriority: PropTypes.func.isRequired,
	priorityTable: propTypeChecking.priorityTable.isRequired,
};

export default PriorityTableComponent;
