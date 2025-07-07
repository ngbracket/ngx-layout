import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: React.JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple to Use',
    Svg: require('@site/static/img/blank.svg').default,
    description: (
      <>
        Ngx-layout is a sophisticated layout API using FlexBox CSS + mediaQuery.
        Providing Angular developers with component layout features using a
        custom Layout API.
      </>
    ),
  },
  {
    title: 'Focus on your application',
    Svg: require('@site/static/img/blank.svg').default,
    description: (
      <>
        The Layout engine intelligently automates the process of applying
        appropriate FlexBox CSS to browser view hierarchies.
      </>
    ),
  },
  {
    title: 'Powered by TypeScript',
    Svg: require('@site/static/img/blank.svg').default,
    description: (
      <>
        Ngx-layout is a pure-Typescript Layout engine; unlike the pure CSS-only
        implementations published in other Flexbox libraries.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles['featureSvg']} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        {/* <Heading as="h3">{title}</Heading> */}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles['features']}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
