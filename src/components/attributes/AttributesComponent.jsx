import React from 'react';

import '../../styles/Attributes.sass';
import metatypeData from '../../data/metatype.json';
import priorityData from '../../data/priority.json';
// TODO: figure out how to make the lint used propTypesChecking with an alias
import DisplayTableComponent from '../DisplayTableComponent';
import PropTypeChecking from '../../config/propTypeChecking';
import ModificationButton from '../ModificationButton';
import SpecialComponent from '../SpecialComponent';

class AttributesComponent extends React.PureComponent {
	render() {
		const { priorityRating, metatype, attributes, actions, metatypeRating, magicPriority, magictype } = this.props;
		const attributeElements = {
				base: {
					incBtn: [],
					display: [],
					decBtn: [],
				},
				special: {
					incBtn: [],
					display: [],
					decBtn: [],
				},
			},
			attibutePointsLeft = priorityData[priorityRating].attributes - attributes.baseSpent,
			specialPointsLeft = priorityData[metatypeRating].metatype[metatype.typeName].special - attributes.specialSpent,
			attList = ['bod', 'agi', 'rea', 'str', 'wil', 'log', 'int', 'cha'];

		let oneBaseAttAtMax = false,
			magicName = '';

		attList.find((att) => {
			const baseAtt = metatypeData[metatype.typeName].min[att],
				currentAtt = baseAtt + attributes[att];

			if (currentAtt < metatypeData[metatype.typeName].max[att]) {
				return false;
			}

			oneBaseAttAtMax = true;
			return true;
		});

		// helper function
		function addingElements(attType, pointsLeft, att, maxPoints, maxAtt, currentAtt, attrPointsAdded) {
			const maxCanRaiseTo = oneBaseAttAtMax && attType === 'base' ? maxPoints - 1 : maxPoints,
				attributeAtMax = attributes[att] > maxCanRaiseTo;
			attributeElements[attType].incBtn.push(<td key={`incBtn-${att}`}>
				<ModificationButton
					attName={att}
					buttonClass={attributeAtMax ?
						'disabled btn-danger' : 'btn-success'
					}
					maxPoints={maxCanRaiseTo}
					pointsLeft={pointsLeft}
					modificationFunction={actions.incrementAttribute}
					attType={`${attType}Spent`}
					symbol="+"
				/></td>,
			);
			attributeElements[attType].display.push(
				<td key={`display-${att}`} className={attributes[att] > maxAtt ? 'table-danger' : ''}>
					{currentAtt}/{maxAtt}{attributes.augmented[att] ? `(${attributes.augmented[att] + currentAtt})` : null}
				</td>,
			);
			attributeElements[attType].decBtn.push(<td key={`decBtn-${att}`}>
				<ModificationButton
					attName={att}
					buttonClass={attrPointsAdded === 0 ? 'disabled btn-danger' : 'btn-warning'}
					modificationFunction={actions.decrementAttribute}
					maxPoints={maxPoints}
					attType={`${attType}Spent`}
					symbol="-"
				/></td>,
			);
		}

		Object.keys(metatypeData[metatype.typeName].min).forEach((att) => {
			let baseAtt = metatypeData[metatype.typeName].min[att],
				currentAtt = baseAtt + attributes[att],
				maxAtt = metatypeData[metatype.typeName].max[att],
				maxPoints = maxAtt - baseAtt;

			if (attList.indexOf(att) > -1) {
				addingElements('base', attibutePointsLeft, att, maxPoints, maxAtt, currentAtt, attributes[att]);
			} else {
				// special stats go here later
				addingElements('special', specialPointsLeft, att, maxPoints, maxAtt, currentAtt, attributes[att]);

				if (magictype in priorityData[magicPriority].magic && magictype !== 'mundane') {
					const essensePenalty = Math.ceil(attributes.ess);
					baseAtt = priorityData[magicPriority].magic[magictype].attribute.points; // find magic rating
					currentAtt = baseAtt + attributes.special - essensePenalty;
					maxAtt = 6 - essensePenalty; // set max to essense rounded down
					maxPoints = maxAtt - baseAtt + essensePenalty;
					addingElements('special', specialPointsLeft, 'special', maxPoints, maxAtt, currentAtt, attributes[att]);
					magicName = priorityData[magicPriority].magic[magictype].attribute.name;
				}
			}
		});

		return (
			<div className="attributes-component ">
				<div className="row">
					<div className="col-lg-12 col-xl-9">
						<h2>Attributes</h2>
						<DisplayTableComponent
							header={(
								<tr>
									<th>Bod</th>
									<th>Agi</th>
									<th>Rea</th>
									<th>Str</th>
									<th>Wil</th>
									<th>Log</th>
									<th>Int</th>
									<th>Cha</th>
									<th>Points</th>
								</tr>
							)}
						>
							<tr>
								{attributeElements.base.incBtn}
								<td />
							</tr>
							<tr className={attibutePointsLeft < 0 ? 'table-danger' : ''}>
								{attributeElements.base.display}
								<td>
									{attibutePointsLeft}
								</td>
							</tr>
							<tr>
								{attributeElements.base.decBtn}
								<td />
							</tr>
						</DisplayTableComponent>
					</div>
					<SpecialComponent
						elements={attributeElements.special}
						pointsLeft={specialPointsLeft}
						magicName={magicName}
					/>
				</div>
			</div>
		);
	}
}

AttributesComponent.propTypes = {
	magictype: PropTypeChecking.selectMagRes.isRequired,
	metatype: PropTypeChecking.selectMetatype.isRequired,
	attributes: PropTypeChecking.attributes.isRequired,
	priorityRating: PropTypeChecking.propTypePriorityCheck.isRequired,
	metatypeRating: PropTypeChecking.propTypePriorityCheck.isRequired,
	magicPriority: PropTypeChecking.propTypePriorityCheck.isRequired,
	actions: PropTypeChecking.actions.isRequired,
};

AttributesComponent.displayName = 'AttributesComponent';

export default AttributesComponent;
