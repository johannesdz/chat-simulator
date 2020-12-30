module.exports = {
  extends: ['stylelint-config-recommended'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extends',
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer'
        ]
      }
    ],
    'block-no-empty': null,
    'unit-whitelist': ['em', 'rem', 's', 'deg', '%', 'px'],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null

  }
}
