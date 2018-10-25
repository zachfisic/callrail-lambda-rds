# Statistical Rethinking: Lecture 02

## Counts to Plausibility

In probability theory, you want to remove all "superstition". Think of it as a way of counting plausible possibilities.

Note that plausibility **is** probability; it's a set of non-negative real numbers that sum to one.

## Building a Model

Q: How to use probability to do typical statistical modeling?

1. Design the model (data story). The data story is what motivates the model. Ask how did the data arise.
2. Condition on the data (update). To condition something is to update one's learning. In Bayesian updating, we convert the prior to the posterior. New data allows us to update our information state and our confidence values.
3. Evaluate the model (critique). "Bayesian Inference" is a logical answer to a question in the form of a model. Models have no wisdom, so you must check the sensitivity of answer to changes in assumptions.

Bayesian models are generative, meaning they correspond to a way you can simulate the observations. Not all statistical models are generative.

In Bayesian statistics, "points" are not special. The estimate, or curve, is the distribution. Also, data order is typically irrelevant, though not always.

Every posterior is a prior for the next observation and every prior is a posterior of some other inference.

## Components of the model

**If you can tell a story for how the data came to be, Bayesian updating is an optimal way, conditional on all the assumptions being true, for extracting information from data relevant to the parameters, a.k.a. the unknown parts of the process**

* Assume...
  * likelihood
  * parameters
  * prior
* Deduce...
  * posterior

#### Likelihood

Likelihood is best described as the probability of data conditional on assumptions. It is a relative count (i.e. mathematical) of the number of ways of seeing data given a particular conjecture.

#### Parameters

What a parameter "is" depends on your focus, what data you have available, and the actual question you're asking.

Some parameters are data, others define the targets of inference.

#### Priors

The prior is what the 'golem' believes before the data. Likelihood and priors define our perspective on the data.

The prior probability of `p` is assumed to be uniform in the interval from zero to one. Flat priors are conventional but hardely ever the best choice.

Multiple priors are how we calm our model and prevent overfitting.

#### Posterior

Bayesian estimate is always posterior *distribution over parameters* (a.k.a. probability of parameters conditional on data). It is the inverse of the likelihood.

Posterior = (Likelihood * Prior) / Average Likelihood

## Computing the posterior

* Analytical approach (often impossible)
* Grid approximation (very intensive)
* Quadratic approximation (approximate)
* Markov chain Monte Carlo (intensive)

#### Grid Approximation

The posterior is: standardized product of the likelihood and the prior. Grid approximation uses a finite grid of parameter values instead of continuous space.

#### Quadratic Approximation

In quadratic approximation, we assume the posterior is normally distributed.

Estimation of the posterior distribution is done with two number: the peak of posterior (*maximum a posteriori*) and the standard deviation of the posterior

## Summary Task Questions

* How much posterior probability is below/above/between specified parameter values?
* Which parameter values contain 50%/80%/95% of posterior probability? (confidence intervals)
* Which paramter value maximizes posterior probability? Which minimizes posterior loss? (point estimates)

## Intervals

Percentile Intervals (PI) have equal amounts of probability in their 'tails'. Depending on the distribution, the most probable value may not be in the interval (i.e. if the posterior mode is skewed far to the right).

High Posterior Density Intervals (HPDI) always contain the 'peak' in posterior distributions.

## Point Estimates

You don't usually want 'point' estimates because:

* a) the entire posterior contains more information
* b) the 'best' point depends on purpose
* c) the mean is nearly always more sensible than the mode