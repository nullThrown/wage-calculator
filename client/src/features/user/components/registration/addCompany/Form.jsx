const Form = ({}) => {
  return (
    <Box as='form' m='30px 0 0' boxShadow='5px 5px 10px rgb(220,220,220)'>
      <NameInput
        isNameError={isNameError}
        isValidationError={isValidationError}
        formData={formData}
        handleTextChange={handleTextChange}
      />

      <PositionInput
        isPositionError={isPositionError}
        isValidationError={isValidationError}
        formData={formData}
        handleTextChange={handleTextChange}
      />

      <WageInput formData={formData} handleNumberChange={handleNumberChange} />

      <OvertimeInput
        formData={formData}
        handleNumberChange={handleNumberChange}
      />

      {/* updateCompany.error should check this as well */}
      {(addCompany.error?.message === 'connection_error' ||
        addCompany.error?.message === 'server_error') && (
        // separate this ErrorText into typography folder
        <ErrorText m='.8em 0 0'>
          Something went wrong :) Please Try again
        </ErrorText>
      )}

      <Flex justifyContent='center'>
        {isEditMode ? (
          <ButtonGroup gap='3'>
            <EditCompanyBtn
              updateCompany={updateCompany}
              handleUpdateCompany={handleUpdateCompany}
              formData={formData}
            />
            <CancelEditBtn handleCancelEditMode={handleCancelEditMode} />
          </ButtonGroup>
        ) : (
          <AddCompanyBtn
            addCompany={addCompany}
            handleAddCompany={handleAddCompany}
          />
        )}
      </Flex>
    </Box>
  );
};

export default Form;
