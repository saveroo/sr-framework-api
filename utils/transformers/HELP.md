

STEP:
1. Build with [SchemaBuilder]
2. Put into SRFeature.json [WIP, by hand]
3. Generate new SubCategory with [SubCategoryBuilder]
4. Increase SRRevision field

Long term:
- [ ] Destructure SRFeature.
- [ ] Normalize with uppercase first letter
- [ ] Refactor with new fields as in newer interface.
- [ ] SRP,
  - Feature Builder
  - SubCategory Builder
    - [Field] StartWith
    - [Field] EndWith
