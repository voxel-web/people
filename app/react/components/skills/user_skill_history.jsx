import React from 'react';
import UserSkillHistoryFilter from './user_skill_history_filter';
import UserSkillHistoryTimeline from './user_skill_history_timeline';
import {getModel, getModel2} from './mock';

export default class UserSkillHistory extends React.Component {
    cssNamespace = 'user-skill-history'

    state = {
        activeCategory: 0,
        skillCategories: [
            {
                name: 'backend',
                isActive: true
            },
            {
                name: 'devops',
                isActive: false
            },
            {
                name: 'ios',
                isActive: false
            },
            {
                name: 'frontend',
                isActive: false
            },
            {
                name: 'design',
                isActive: false
            },
            {
                name: 'android',
                isActive: false
            },
        ]
    }

    constructor(props) {
        super(props);
        this.setModel(this.state.skillCategories[this.state.activeCategory].name);
    }
    
    changeActiveCategory(index) {
        const skillCategories = [].concat(this.state.skillCategories);
        
        skillCategories[this.state.activeCategory].isActive = false;
        skillCategories[index].isActive = true;
        
        this.setState({skillCategories, activeCategory: index});
        this.setModel(skillCategories[index].name);
    }

    setModel(category, startDate, endDate) {
        this.state.model = category === 'backend' ? getModel() : getModel2();
    }
    
    render() {
        return (
            <div>
                <UserSkillHistoryFilter
                    cssNamespace = {`${this.cssNamespace}-filter`}
                    listPrimaryText='Skill categories:'
                    listItems={this.state.skillCategories}
                    onItemClick={this.changeActiveCategory.bind(this)}
                />
                <UserSkillHistoryTimeline model={this.state.model} />
            </div>
        );
    }
}
