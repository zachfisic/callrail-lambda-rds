# Statistical Rethinking: Lecture 01

## The Golem of Prague

The "grade school" line of thinking in mathematics is that solving mathematical problems can only be done or approached in a very particular way. This is not the case in statistics or applied math, which is much more akin to engineering; The focus is more about applicable solutions rather than a single 'right' one.

It helps to think of models as "golems": simple constructs that are slaves to their creator's instructions. While models are blind to their creator's intent, they have the potential to be very powerful.

"All models are false, but some are useful."

The 'classical methods' used in statistics are useful but aren't as powerful as more modern methods.

"A lot of the motivation for thinking about statistical inference as a collection of tests is because science is supposed to be advanced through falsification of hypotheses. Falsification is a criterion that demarks scientific hypotheses but is not a criterion that advances them."

## Flaws of Popperism

"Popperism" is the assumption that science progresses by logical falsification and that statistics should aim to falsify. This is not true; science is a process of cultural evolution that takes generations to figure systems out.

Hypotheses are nearly always vague and involve unstated assumptions. Process models on the other hand are typically mathematical and use clear assumptions. There may be multiple process models asssociated with a single hypothesis. 

Statistical models are derived from process models and show a distribution of a frequency of observations.

"Information entropy" is the tendency for statistical models to conform to more than one kind of process model. This can make logical inference very difficult. To get around this, you need multiple non-null models.

You cannot understand science simply by rejecting null models.

## Measurement Matters

A summary of "Modus Tollens"

* Hypothesis `H`
* Implication `D`
* Observe not-`D`, deduce not-`H`
* Observe `D`, infer nothing

Example: `H` => "all swans are white" is rejected by the observation of black swans. A single black swan is all that's required to reject the hypothesis, but observing a bunch of white swans does not speak to the inherent truth value of the hypothesis.

Problems with "Modus Tollens":

* observation errors
* measurement errors
* continuous hypotheses

## The Failure of Falsification

Strict falsification is not possible in a realistic scientific setting. Remember, hypotheses are not models and measurement methods matter.

1. Falsification is *consensual*, not *logical*
2. Falsifiablility is about *demarcation*, not method.
3. Science is a social technology

"There is even something like a methodological justification for individual scientists to be dogmatic and biased. Since *the method of science is that of critical discussion*, it is of great importance that the theories criticized should be tenaciously defended. For only in this way can we learn their real power" --Karl Popper, The Myth of the Framework

## Golem Engineering

There are several options for vetting statistical golems:

* Bayesian data analysis
* Multilevel modeling
* Model comparison and information criteria

The Bayesian view is the most common and most "permissive" statistical framework, but it is not the "one true way" of mathematical modeling.

## Bayesian Data Analysis

Bayesian data analysis is just the continuous version of discrete logic. It uses probability to describe uncertainty. That is, we extend discrete logic (true/false) to a scale of continuous plausibility.

Bayesian is computationally difficult (e.g. Markov chain Monte Carlo or MCMC) and used to be somewhat controversial.

It's often contrasted with the frequentist view of probability where the approach is that probability is just limiting frequency and that uncertainty arises from sampling variation. However, frequentist is way less general than Bayesian.

One way to think about Bayesian probability is that the uncertainty is a product of the *incompleteness of our information*, not in the world itself.

## Multilevel Models

The term "multilevel models" is used to describe models with multiple levels of uncertainty. Essentially, the parameters of a model are replaced with models themselves.

Common uses include:

* repeat and imbalanced sampling
* study variation
* avoid averaging
* phylogenetics, factor and path analysis, networks, spatial models

## Model Comparison

Instead of falsifying a null model, compare meaningful models.

Overfitting is a common obstacle in model comparison. When you have overfitting, your model is likely to produce bad predictions. 

Information theory is inherently Bayesian.

## Small Worlds and Large Worlds

"Small World" refers to the world of the "golem's" assumptions. Bayesian golems are optimal in the small world.

"Large World" refers to the real world where there is no guarantee of optimality for any kind of golem.

The "truthiness" of a model is only relevant inside it's own small world. It still must be evaluated against the 'large world'.

## Garden of Forking Data

At it's simplest, probability theory is just "counting". It's not glamorous; it's just a convenient method of counting infinite possible facts.

In a "small world" context, consider a story or narrative where the future is full of branching paths and each choice closes some. The data consists of many possible events. Each observation eliminates some.