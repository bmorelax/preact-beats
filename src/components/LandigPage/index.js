import style from './style';

const Landing = ({ initBumpkit, loading }) => (
	<div class={style.container}>
		<div class={style.roundButton} onClick={initBumpkit}>
			{loading ? (
				<svg class={style.spinner} viewBox="0 0 66 66">
					<circle
						class={style.circle}
						fill="none"
						stroke-width="3"
						strokeLinecap="round"
						cx="33"
						cy="33"
						r="30"
					/>
				</svg>
			) : (
				'Start'
			)}
		</div>
	</div>
);

export default Landing;
