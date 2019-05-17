import styled from 'styled-components';
import { connect } from 'preact-redux';
import {
	addTempo,
	decreaseTempo
} from '../../actions';

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	height: 5vh;
	width: 25vw;
	color: #37d6a9;
	font-size: 1.1rem;
`;

const Button = styled.div`
  height: 100%;
  background: #27272f;
  width: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1vw;
`;

const StyledPath = styled.path`
	fill: #fff;
`;

const TempoButtons = (props) => (
	<Container>
		<Button onClick={props.addTempo}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<StyledPath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
			</svg>
		</Button>
		<Button onClick={props.decreaseTempo}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<StyledPath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
			</svg>
		</Button>
	</Container>
);

export default connect(
	null,
	{
		addTempo,
		decreaseTempo
	}
)(TempoButtons);