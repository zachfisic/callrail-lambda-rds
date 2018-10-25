# Statistical Rethinking: Lecture 03

## Predictive Checks

Posterior probability is never enough and even the best model might make terrible predictions.

A predictive check allows us to use the uncertainty from the posterior distribution to simulate implied data from the model.

Machines don't know when they fail; they simply report answers

There is no universally best way to evaluate adequacy of model-based predictions. Predictive checks are something like a significance test, but not.

Good predictive checks always depend upon purpose and imagination

* * *

1. Make the model
2. Approximate the posterior
3. Use posterior to describe the uncertainty
4. Use posterior-based predictions to check the model

* * *

## Philosophy

Inference is in the language of probability. Your model will only talk to you in probabilities.

The best parameter value is not the focus. **The whole posterior is the focus**.

Even the "best" model may be terrible

## Linear Regression

Linear regression is the "geocentric" model of statistics: It is descriptively accurate, but mechanistically wrong. That is, it can't explain things in a very satisfying way. It is a general method of approximation and as such, shouldn't be taken too seriously.

Think of linear regression as a simple statistical "golem": a model of mean and variance of normally distributed measure.

The *mean* refers to additive combination of predictors, and the variance is constant.

## Distributions

Normal (Gaussian) distributions are common in statistics because they are:

1. easy to calculate with
2. common in nature
3. most logical assumption

If the only thing you have concerning a collection of measurements is a mean and variance, then the only really logical distribution for those measurements is a Gaussian one.

Processes that produce normal distributions:

* addition
* products of small deviations
* logarithms of products

What is the ontological perspective for normal distribution?

* processes which add "fluctuations" result in dampening
* damped fluctuations end up Gaussian
* no information is left except the mean and variance
* process cannot be inferred from the distribution

What is the epistemological perspective for normal distribution?

* you know *only* the mean and variance
* largest information entropy
* nature likes maximum entropy distributions

## Linear Models

General Linear Model examples include: *t*-test, single regression, multiple regression, ANOVA, ANCOVA, MANOVA, MANCOVA.

Learn strategy, not procedure.

## Language for Modeling

Questions to answer:

1. What are the outcomes? (a.k.a what your model makes predictions for)
2. How are the outcomes generated? (what is likelihood? a.k.a the data story)
3. What are the predictors if any? (a.k.a what gets used by the likelihood function)
4. How do predictors relate to likelihood?
5. What are the priors? (a.k.a. initial information state for the machine)

Example:

`n0 ~ Binomial(n, p)`
`p ~ Uniform(0,1)`

Read as: *The count n0 is distributed binomially with sample size n and probability p. The prior for p is assumed to be uniform between zero and one.*

*t*-distributions are normal distributions where you're uncertain about the standard deviation

a marginal distribution is one where it averages over all uncertainty of other parameters

## Estimating mu and sigma

For every combination of mu (mean) and sigma (standard deviation), we need to assign a relative plausibility. The posterior distribution in this case is 2-dimensional.
